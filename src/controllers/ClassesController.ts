import { Request, Response } from 'express'
import db from '../database/connection'
import convertHoursToMinutes from '../utils/convertHoursToMinutes'

interface IScheduleItem {
  week_day: number,
  from: string,
  to: string
}

class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!week_day || !subject || !time) {
      response.status(400).json({
        error: 'Missing fields to search for classes'
      })
    }

    const timeInMinutes = convertHoursToMinutes(filters.time as string)

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
    
    response.status(200).json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body
  
    const trx = await db.transaction()
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio 
      })
  
      const user_id = insertedUsersIds[0]
  
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      })
  
      const class_id = insertedClassesIds[0]
  
      const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          class_id: class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to)
        }
      })
  
      await trx('class_schedule').insert(classSchedule)
  
      await trx.commit()
  
      response.status(201).json({message: 'Class successfully created'})
    } catch(err) {
      await trx.rollback()
      response.status(400).json({error: 'Unexpected error while creating new classes'})
    }
  }
}

export default ClassesController