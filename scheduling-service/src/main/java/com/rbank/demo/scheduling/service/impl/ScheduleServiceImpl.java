package com.rbank.demo.scheduling.service.impl;

import com.rbank.demo.scheduling.model.ProjectPlan;
import com.rbank.demo.scheduling.model.Schedule;
import com.rbank.demo.scheduling.model.Task;
import com.rbank.demo.scheduling.model.TaskSchedule;
import com.rbank.demo.scheduling.service.ScheduleService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private Deque<Task> queue = new ArrayDeque<Task>();

    @Override
    public Schedule createSchedule(ProjectPlan plan) {
        queue = new ArrayDeque<Task>();

        // Sort task based on dependency
        for (Task task: plan.getTasks()) {
            queue.push(task);
            if (task.getItems() != null && !task.getItems().isEmpty()) {
                getSortedTasks(task.getItems());
            }
        }

        // Assign start and end date schedule based on duration and task dependency
        Queue<TaskSchedule> schedule = new LinkedList<TaskSchedule>();
        for (Task taskQueue: queue) {
            TaskSchedule currentSched = new TaskSchedule(taskQueue.getTaskName(), taskQueue.getDuration());
            if (schedule.isEmpty() ||
                    (taskQueue.getItems() == null || taskQueue.getItems().isEmpty())) {
                currentSched.setStartDate(plan.getStartDate());
                currentSched.setEndDate(plan.getStartDate().plusDays(taskQueue.getDuration()));

            } else if (hasTaskDependency(schedule, taskQueue.getItems())) {
                TaskSchedule lastCompletedTask = getLastCompletedTask(schedule, taskQueue.getItems());
                currentSched.setStartDate(lastCompletedTask.getEndDate());
                currentSched.setEndDate(lastCompletedTask.getEndDate().plusDays(taskQueue.getDuration()));
            }
            schedule.add(currentSched);
        }

        return new Schedule(plan.getProjectName(), new ArrayList<TaskSchedule>(schedule));
    }

    @Override
    public void consolePrintSchedule(Schedule schedule) {
        System.out.println("PROJECT PLAN NAME:" + schedule.getProjectPlan());
        System.out.println("SCHEDULE:");
        for (TaskSchedule sched: schedule.getTasks()) {
            System.out.println(sched.getTaskName() + " - " + sched.getStartDate() + " - " + sched.getEndDate() + "   (" + sched.getDuration() + ")");
        }
    }

    private Deque<Task> getSortedTasks(List<Task> tasks) {
        for (Task task: tasks) {
            queue.push(task);
            if (task.getItems() != null && !task.getItems().isEmpty()) {
                getSortedTasks(task.getItems());
            }
        }

        return queue;
    }

    private boolean hasTaskDependency(Queue<TaskSchedule> taskSchedule, List<Task> dependentTasks) {
        List<String> taskSchedNames = taskSchedule.stream().map(sched -> sched.getTaskName()).collect(Collectors.toList());
        List<String> dependentTaskNames = dependentTasks.stream().map(task -> task.getTaskName()).collect(Collectors.toList());
        return taskSchedNames.containsAll(dependentTaskNames);
    }

    private TaskSchedule getLastCompletedTask(Queue<TaskSchedule> taskSchedule, List<Task> dependentTasks) {
        List<String> dependentTaskNames = dependentTasks.stream().map(task -> task.getTaskName()).collect(Collectors.toList());
        List<TaskSchedule> taskDependencies = taskSchedule.stream().filter(sched -> dependentTaskNames.contains(sched.getTaskName())).collect(Collectors.toList());

        return taskDependencies.stream()
                    .sorted(Comparator.comparing(TaskSchedule::getEndDate).reversed())
                    .findFirst().orElse(null);
    }
}
