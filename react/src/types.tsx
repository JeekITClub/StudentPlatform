interface ISociety {
  // user = models.OneToOneField(User, on_delete=models.CASCADE)
  // members = models.ManyToManyField(Student, blank=True)
  id?: number,
  society_id: number,
  name: string,
  introduction?: string,
  president_name?: string,
  president_grade?: number,
  president_class?: number,
  president_qq?: string,
  president_phone?: string,
  achievements?: string,
  recruit?: boolean,
  email?: string,
  type?: number,
  status?: number,
  recruit_qq_group?: string,
  established_time?: string,
  password_changed?: boolean,
  // tags = models.ManyToManyField(SocietyTag, blank=True)
  avatar?: string,
  mentor?: string,
  activity_time?: string,
  activity_place?: string,
  special_room: string,
  assistant?: string
}

interface ICreditDistribution {
  id?: number
  year: number,
  semester: number,
  credit: number,
  open: boolean,
  society: ISociety,
  receivers: IStudent[]
}

interface IStudent {
  id: number,
  name: string,
  grade: number,
  class_num: number
}

export {ISociety, ICreditDistribution, IStudent};