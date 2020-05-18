package com.rbank.demo.scheduling.service;

import com.rbank.demo.scheduling.model.ProjectPlan;
import com.rbank.demo.scheduling.model.Schedule;

public interface ScheduleService {

    Schedule createSchedule(ProjectPlan plan) throws Exception;

    void consolePrintSchedule(Schedule schedule);
}

