package com.rbank.demo.scheduling.service;

import com.rbank.demo.scheduling.model.ProjectPlan;
import com.rbank.demo.scheduling.model.Schedule;

public interface ScheduleService {

    Schedule createSchedule(ProjectPlan plan);

    void consolePrintSchedule(Schedule schedule);
}

