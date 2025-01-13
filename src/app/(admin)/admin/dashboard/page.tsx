import MemberAnalyticsChart from '@/components/AdminDashboard/MemberAnalyticsChart/MemberAnalyticsChart'
import StatisticsCard from '@/components/AdminDashboard/StatisticCard/StatisticCard'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <StatisticsCard/>
      <MemberAnalyticsChart/>
    </div>
  )
}

export default DashboardPage