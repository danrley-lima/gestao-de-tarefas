package com.danrley.gestao_tarefas.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;

import com.danrley.gestao_tarefas.model.task.TaskStatusEnum;

public class StringToTaskStatusEnumConverter implements Converter<String, TaskStatusEnum> {
    @Override
    public TaskStatusEnum convert(@NonNull String source) {
        return TaskStatusEnum.valueOf(source.trim().toUpperCase());
    }
}
