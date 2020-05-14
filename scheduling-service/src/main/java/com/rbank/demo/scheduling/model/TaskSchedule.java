package com.rbank.demo.scheduling.model;

import java.time.LocalDate;

public class TaskSchedule extends BaseTask {

    private LocalDate startDate;

    private LocalDate endDate;

    public TaskSchedule(String taskName, int duration) {
        super(taskName, duration);
    }

    public TaskSchedule(LocalDate startDate, LocalDate endDate,
                        String taskName, int duration) {
        super(taskName, duration);
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

}
