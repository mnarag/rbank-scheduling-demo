import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { IntegralUITreeView } from '@lidorsystems/integralui-web/bin/integralui/components/integralui.treeview';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;
  @ViewChild('treeview') treeview: IntegralUITreeView;

  public items: Array<any>;
  private isEditActive = false;
  public editItem: any = null;
  private originalText = '';
  public editorFocused = false;
  public hoverItem: any = null;
  private itemCount = 1;
  private itemNames: Array<any> = [];
  public errorMessage: string;
  public hasError = false;

  public projectPlan: any = {
    projectName: 'Project XXX',
    startDate: '2020-05-01'
  };
  public schedule: any = {
    projectPlan: '',
    tasks: []
  };

  public ctrlStyle: any = {
      general: {
          normal: 'trw-add-dynamic'
      }
  };

  constructor(public scheduleService: ScheduleService) {

  }

  ngOnInit() {
    this.items = [
      { taskName: 'Task 1', duration: 1}
    ];
    this.projectPlan = {
      projectName: 'Project XXX',
      startDate: new Date().toISOString().substr(0, 10)
    };
    this.schedule = {
      projectPlan: '',
      tasks: []
    };

    this.isEditActive = false;
    this.editItem = null;
    this.originalText = '';
    this.editorFocused = false;
    this.hoverItem = null;
    this.itemCount = 1;
    this.itemNames = [];
    this.errorMessage = null;
    this.hasError = false;
  }

  // Add/Remove ------------------------------------------------------------------------

  createNewItem() {
      this.itemCount++;

      return { taskName: 'Task ' + this.itemCount, duration: 1 };
  }

  addRoot() {
      const item: any = this.createNewItem();

      this.treeview.addItem(item);
      this.showEditor(item);
  }

  addChild(parent: any) {
      const item: any = this.createNewItem();

      this.treeview.addItem(item, parent);
      this.showEditor(item);
  }

  deleteItem(item: any) {
      if (item) {
          this.treeview.removeItem(item);
      }
  }

  // Edit ------------------------------------------------------------------------------

  // Selects the whole text in the text editor
  selectContent(e: any) {
      if (e.target) {
          setTimeout(() => {
              e.target.setSelectionRange(0, e.target.value.length);
          }, 1);
      }
  }

  showEditor(item: any) {
      this.originalText = item.taskName;
      this.isEditActive = true;
      this.editItem = item;
      this.editorFocused = true;

      item.allowDrag = false;
  }

  closeEditor() {
    this.hasError = false;
    this.errorMessage = null;
    this.itemNames = [];
    this.getTaskDependency(this.items);

    if (!this.editItem.duration || this.editItem.duration < 1) {
      this.hasError = true;
      this.errorMessage = 'Duration is required';
    }
    if (!this.editItem.taskName || this.editItem.taskName.trim() === '') {
      this.hasError = true;
      this.errorMessage = 'Task Name is required';
    }

    if (!this.hasError) {
      if (this.editItem) {
        this.editItem.allowDrag = true;
      }

      this.editItem = null;
      this.originalText = '';
      this.editorFocused = false;
      this.isEditActive = false;
    }
  }

  editorKeyDown(e: any) {
    if (this.editItem) {
      switch (e.keyCode) {
        case 13: // ENTER
          this.closeEditor();
          break;

        case 27: // ESCAPE
          this.editItem.taskName = this.originalText;
          this.closeEditor();
          break;
      }
    }
  }

  editorLostFocus() {
    this.closeEditor();
  }

  getTaskDependency(items) {
    for (const item of items) {
      if (this.itemNames.includes(item.taskName.toLowerCase())) {
        this.errorMessage = 'Duplicate task name';
        this.hasError = true;
        break;
      }

      this.itemNames.push(item.taskName.toLowerCase());
      if (item.items) {
        this.getTaskDependency(item.items);
      }
    }
  }

  createSchedule() {
    this.projectPlan.tasks = this.items;
    this.scheduleService.createSchedule(this.projectPlan).subscribe(data => {
      this.schedule = data;
    });
  }

  resetSchedule() {
    this.ngOnInit();
  }
}
