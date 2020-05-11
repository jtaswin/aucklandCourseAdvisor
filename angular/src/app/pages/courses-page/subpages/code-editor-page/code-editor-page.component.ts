import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor-page',
  templateUrl: './code-editor-page.component.html',
  styleUrls: ['./code-editor-page.component.scss']
})
export class CodeEditorPageComponent implements OnInit {

  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
