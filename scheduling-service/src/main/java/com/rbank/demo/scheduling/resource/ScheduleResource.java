package com.rbank.demo.scheduling.resource;

import com.rbank.demo.scheduling.model.ProjectPlan;
import com.rbank.demo.scheduling.model.Schedule;
import com.rbank.demo.scheduling.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleResource {

    @Autowired
    private ScheduleService service;

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody ProjectPlan plan) throws Exception {
        return ResponseEntity.ok(service.createSchedule(plan));
    }
}
