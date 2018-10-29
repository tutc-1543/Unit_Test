<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ScheduleRepository extends EloquentRepository
{
    public function model()
    {
        return \App\Schedule::class;
    }

    public function showSchedule($id)
    {
        return $this->model
            ->join(
                DB::raw('(select day_month.id, month, day, year
                                from day_month
                                inner join days on day_id = days.id
                                inner join months on month_id = months.id
                        ) as dayMonth'),
                'day_month_id',
                'dayMonth.id'
            )
            ->where('user_id', $id)->get();
    }

    public function traineeSchedule()
    {
        return $this->model
            ->select(DB::raw('schedules.id, day_month_id, day, month, year, status, count(*) as count'))
            ->join(
                DB::raw('(select day_month.id, day, month, year
                        from day_month
                        inner join days on day_id = days.id
                        inner join months on month_id = months.id
                ) as dayMonth'),
                'day_month_id',
                'dayMonth.id'
            )
            ->where('status', '>', '0')
            ->groupBy('status', 'year', 'month', 'day')
            ->orderBy('year')
            ->orderBy('month')
            ->orderBy('day')
            ->get();
    }

    public function findByDate($date, $id)
    {
        $day = date('j', strtotime($date));
        $month = date('n', strtotime($date));
        $year = date('Y', strtotime($date));

        return $this->model->where('user_id', $id)
                ->whereIn(
                    'day_month_id',
                    DB::table('day_month')
                            ->join('days', 'day_id', 'days.id')
                            ->join('months', 'month_id', 'months.id')
                            ->select('day_month.id')
                            ->where([
                                'days.day' => $day,
                                'months.month' => $month,
                                'months.year' => $year
                            ])
                        )->first();
    }
}