import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../domain/TaskPriority.enum';

@Pipe({
  name: 'priorityTranslate',
})
export class PriorityTranslatePipe implements PipeTransform {
  transform(priority: TaskPriority): string {
    const translations: Record<TaskPriority, string> = {
      [TaskPriority.LOW]: 'Baixa',
      [TaskPriority.MEDIUM]: 'Média',
      [TaskPriority.HIGH]: 'Alta',
    };
    return translations[priority] || priority;
  }
}
