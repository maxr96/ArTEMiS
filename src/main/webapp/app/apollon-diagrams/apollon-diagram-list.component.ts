import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';
import * as ApollonDiagramTitleFormatter from './apollon-diagram-title-formatter';
import { ApollonDiagram, ApollonDiagramService } from '../entities/apollon-diagram';
import { ApollonDiagramCreateFormComponent } from './apollon-diagram-create-form.component';
import { DiagramType } from '@ls1intum/apollon';

@Component({
    selector: 'jhi-apollon-diagram-list',
    templateUrl: './apollon-diagram-list.component.html',
    providers: [ApollonDiagramService, JhiAlertService],
})
export class ApollonDiagramListComponent implements OnInit {
    apollonDiagrams: ApollonDiagram[] = [];
    predicate: string;
    reverse: boolean;

    constructor(
        private apollonDiagramsService: ApollonDiagramService,
        private jhiAlertService: JhiAlertService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.predicate = 'id';
        this.reverse = true;
    }

    ngOnInit() {
        this.apollonDiagramsService.query().subscribe(
            response => {
                this.apollonDiagrams = response.body;
            },
            response => {
                this.jhiAlertService.error('arTeMiSApp.apollonDiagram.home.error.loading');
            },
        );
    }

    goToDetailsPage(id: number) {
        this.router.navigate([id], {
            relativeTo: this.route,
        });
    }

    delete(apollonDiagram: ApollonDiagram) {
        this.apollonDiagramsService.delete(apollonDiagram.id).subscribe(
            response => {
                this.jhiAlertService.success('arTeMiSApp.apollonDiagram.delete.success', { title: apollonDiagram.title });
                this.apollonDiagrams = this.apollonDiagrams.filter(diagram => {
                    return diagram.id !== apollonDiagram.id;
                });
            },
            response => {
                this.jhiAlertService.error('arTeMiSApp.apollonDiagram.delete.error', { title: apollonDiagram.title });
            },
        );
    }

    getTitleForApollonDiagram(diagram: ApollonDiagram) {
        return ApollonDiagramTitleFormatter.getTitle(diagram);
    }

    openCreateDiagramDialog() {
        const modalRef = this.modalService.open(ApollonDiagramCreateFormComponent, { size: 'lg', backdrop: 'static' });
        const formComponentInstance = modalRef.componentInstance as ApollonDiagramCreateFormComponent;
        // class diagram is the default value and can be changed by the user in the creation dialog
        formComponentInstance.apollonDiagram = new ApollonDiagram(DiagramType.ClassDiagram);
    }

    trackId(index: number, item: ApollonDiagram) {
        return item.id;
    }

    callback() {}
}
