import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-block',
  standalone: true,
  templateUrl: './info-block.html',
  styleUrls: ['./info-block.scss'],
})
export class InfoBlockComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() tags?: string[];
  @Input() linkLabel?: string;
  @Input() linkUrl?: string;
  @Input() highlight = false;

  private _bodyLines: string[] = [];

  @Input() set body(value: string | string[] | undefined) {
    if (!value) {
      this._bodyLines = [];
    } else if (Array.isArray(value)) {
      this._bodyLines = value;
    } else {
      this._bodyLines = [value];
    }
  }

  get bodyLines(): string[] {
    return this._bodyLines;
  }
}
