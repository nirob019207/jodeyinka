import RecentPost from '@/components/RecentPost/RecentPost'
import SearchFilter from '@/components/SearchFilter/SearchFilter'
import Videos from '@/components/Videos/Videos'
import React from 'react'

const ResourcePage = () => {
  return (
    <div>
        <SearchFilter/>
        <Videos/>
        <RecentPost/>
    </div>
  )
}

export default ResourcePage