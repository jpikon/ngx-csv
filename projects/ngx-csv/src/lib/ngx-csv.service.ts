import { Injectable, NgZone } from '@angular/core';
import { CSVExporterProps, hasResolvables, isResolvable } from './ngx-csv.model';

@Injectable({
  providedIn: 'root'
})
export class NgxCsvService {

  constructor(private ngZone: NgZone) { }

  export<T>(rows: T[], props: CSVExporterProps<T>, filename = 'CSV Export') {
    this.ngZone.runOutsideAngular(() => ((csvContent: string) => {
      csvContent += this.getHeader(props);
      csvContent += this.getRows(rows, props);
      (link => this.download(link, csvContent, `${filename}.csv`))(document.createElement('a'));
    })(''));
  }

  private getHeader<T>(props: CSVExporterProps<T>): string {
    let header_ = '';
    props.forEach((p, i) => header_ += ((hasResolvables(p) ? p[0] : p) + (i < props.length - 1 ? `,` : '')));
    return header_;
  }

  private getRows<T>(rows: T[], props: CSVExporterProps<T>): string {
    let rows_ = '';
    rows.forEach(e => rows_ += '\r\n' + props.map(p => hasResolvables(p) ? (isResolvable(p[1]) ? p[1](e) : e[p[1]]) : e[p]).join(','));
    return rows_;
  }

  private download(link: HTMLAnchorElement, content: string, filename: string) {
    const escapedContent = 'data:text/csv;charset=utf-8,' +  encodeURIComponent(content);
    link.setAttribute('href', escapedContent);
    link.setAttribute('download', filename);
    document.body.appendChild(link).click();
    setTimeout(() => link.remove(), 1000);
  }
}
