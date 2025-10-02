// Declare Homework
export class Homework {
  id?: any; //any: can be string or number
  title?: string; // "?" means optional, can be empty
  description?: string;
  done?: boolean;
  studentId?: number;
  createdByTeacher?: boolean;
}
