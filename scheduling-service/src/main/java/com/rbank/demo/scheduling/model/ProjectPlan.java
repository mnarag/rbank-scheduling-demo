package com.rbank.demo.scheduling.model;

import java.time.LocalDate;
import java.util.List;

public class ProjectPlan {

    private String projectName;

    private List<Task> tasks;

    private LocalDate startDate;

    public ProjectPlan() {
    }

    public ProjectPlan(String projectName, List<Task> tasks, LocalDate startDate) {
        this.projectName = projectName;
        this.tasks = tasks;
        this.startDate = startDate;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

}
