import {Injectable} from "@angular/core";
import {Course} from "../models/course.model";
import { environment } from "../../environments/environment.development";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async loadAllCourses(): Promise<Course[]> {

    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();

    return payload.courses;

  }


}
