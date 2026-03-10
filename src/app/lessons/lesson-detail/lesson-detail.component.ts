import {Component, inject, input, output} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "../../services/lessons.service";
import {MessagesService} from "../../messages/messages.service";

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

    lesson = input.required<Lesson | null>();
    lessonUpdated = output<Lesson>();
    cancel = output<void>();

    lessonsService = inject(LessonsService);

    onCancel() {
        this.cancel.emit();
    }

    async onSave(description: string) {
        const lessonId = this.lesson()!.id
        const updatedLesson = await this.lessonsService.saveLesson(lessonId, {description});
        this.lessonUpdated.emit(updatedLesson);
    }


}
