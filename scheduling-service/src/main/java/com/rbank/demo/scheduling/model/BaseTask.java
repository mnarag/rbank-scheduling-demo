package com.rbank.demo.scheduling.model;

public class BaseTask {

    private String taskName;

    private int duration;

    public BaseTask(String taskName, int duration) {
        this.taskName = taskName;
        this.duration = duration;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
