<template>
<div>
    <div class="m-grid m-grid--hor m-grid--root m-page">
        <vue-header></vue-header>

        <left-aside></left-aside>

        <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
            <div class="m-grid__item m-grid__item--fluid m-wrapper">
                <!-- BEGIN: Subheader -->
                <div class="m-subheader ">
                    <div class="d-flex align-items-center">
                        <div class="mr-auto">
                            <h3 class="m-subheader__title m-subheader__title--separator">Calendar</h3>
                            <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
                                <li class="m-nav__item m-nav__item--home">
                                    <a href="#" class="m-nav__link m-nav__link--icon">
                                        <i class="m-nav__link-icon la la-home"></i>
                                    </a>
                                </li>
                                <li class="m-nav__separator">-</li>
                                <li class="m-nav__item">
                                    <a href="" class="m-nav__link">
                                        <span class="m-nav__link-text">Calendar</span>
                                    </a>
                                </li>
                                <li class="m-nav__separator">-</li>
                                <li class="m-nav__item">
                                    <a href="" class="m-nav__link">
                                        <span class="m-nav__link-text">Calendar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        
                <!-- END: Subheader -->  
                
                <div class="m-content">
                    <div class="row">
                        <div class="col-lg-12">

                            <!--begin::Portlet-->
                            <div class="m-portlet" id="m_portlet">
                                <div class="m-portlet__head">
                                    <div class="m-portlet__head-caption">
                                        <div class="m-portlet__head-title">
                                            <span class="m-portlet__head-icon">
                                                <i class="flaticon-calendar-2"></i>
                                            </span>
                                            <h3 class="m-portlet__head-text">
                                                Calendar
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-portlet__body">
                                    <full-calendar :events="events" :config="config" :header="header"></full-calendar>
                                </div>
                            </div>

                            <!--end::Portlet-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        <vue-footer></vue-footer>
    </div>

    <div id="m_scroll_top" class="m-scroll-top">
        <i class="la la-arrow-up"></i>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            events: [''],
            config: {
                defaultView: 'month'
            },
            header: {
                left: 'prev,next',
                center: 'title',
                right: ''
            }
        };
    },

    created() {
        console.log(this.$store.state.headers);
        fetch('/api/schedules', {
            headers: this.$store.state.headers
        })
            .then(res => res.json())
            .then(res => {
                this.events = res.data;
            });
    }
};
</script>