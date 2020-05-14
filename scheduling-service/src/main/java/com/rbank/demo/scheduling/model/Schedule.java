package com.rbank.demo.scheduling.model;

import java.util.List;

public class Schedule {

    private String projectPlan;

    private List<TaskSchedule> tasks;

    public Schedule(String projectPlan, List<TaskSchedule> tasks) {
        this.projectPlan = projectPlan;
        this.tasks = tasks;
    }

    public String getProjectPlan() {
        return projectPlan;
    }

    public void setProjectPlan(String projectPlan) {
        this.projectPlan = projectPlan;
    }

    public List<TaskSchedule> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskSchedule> tasks) {
        this.tasks = tasks;
    }


}

