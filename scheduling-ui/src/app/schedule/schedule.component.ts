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
  }

  // Add/Remove ------------------------------------------------------------------------

  createNewItem() {
      this.itemCount++;

      return { taskName: 'Task ' + this.itemCount };
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
      if (this.editItem) {
          this.editItem.allowDrag = true;
      }

      this.editItem = null;
      this.originalText = '';
      this.editorFocused = false;
      this.isEditActive = false;
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

  createSchedule() {
    this.projectPlan.tasks = this.items;
    this.scheduleService.createSchedule(this.projectPlan).subscribe(data => {
      this.schedule = data;
    });
  }
}
