import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
import { MessagesService } from '../messages/messages.service';

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

    mode = signal<'master' | 'detail'>('master');
    lessons = signal<Lesson[]>([]);
    selectedLesson = signal<Lesson | null>(null);
    searchInput = viewChild<ElementRef>('search');

    lessonService = inject(LessonsService);
    messagesService = inject(MessagesService);

    async onSearch() {
        const query = this.searchInput()?.nativeElement.value;
        const results = await this.lessonService.loadLessons({query});
        this.lessons.set(results);
    }

    onLessonSelected(lesson: Lesson) {
        this.mode.set('detail');
        this.selectedLesson.set(lesson);
    }

    onCancel() {
        this.mode.set('master');        
    }

    onLessonUpdated(updatedLesson: Lesson) {
        try {
            this.lessons.update( lessons => (lessons.map(l => l.id === updatedLesson.id? updatedLesson: l)));
            this.mode.set('master');        
        } catch(err) {
            console.error(err);
            this.messagesService.showMessage('Failed Save Lesson', 'error')
        }
    }

}
