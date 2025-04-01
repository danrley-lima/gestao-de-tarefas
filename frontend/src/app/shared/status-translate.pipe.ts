import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from 'domain/TaskStatus.enum';

@Pipe({
  name: 'statusTranslate',
})
export class StatusTranslatePipe implements PipeTransform {
  transform(status: TaskStatus): string {
    const translations: Record<TaskStatus, string> = {
      [TaskStatus.COMPLETED]: 'Concluída',
      [TaskStatus.IN_PROGRESS]: 'Em andamento'
    };
    return translations[status] || status;
  }
}
