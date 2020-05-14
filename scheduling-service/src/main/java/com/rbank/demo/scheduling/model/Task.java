package com.rbank.demo.scheduling.model;

import java.util.List;

public class Task extends BaseTask {

    private List<Task> items;

    public Task(String taskName, List<Task> items, int duration) {
        super(taskName, duration);
        this.items = items;
    }

    public List<Task> getItems() {
        return items;
    }

    public void setItems(List<Task> items) {
        this.items = items;
    }

}
