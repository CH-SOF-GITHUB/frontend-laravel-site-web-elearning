import React from 'react'
import '../../App.css'
import Cards from '../Cards'
import HeroSection from '../HeroSection'
import NewCourseCards from '../NewCourseCards'
import NewBlogCards from '../NewBlogCards'
import TopCategoryCards from '../TopCategoryCards'

const Home = () => {
  return (
    <>
      <HeroSection path='/signup' />
      {/*Uop Categories */}
      <TopCategoryCards />
      {/* Top Courses */}
      <Cards />
      {/* New Courses */}
      {/*<NewCourseCards />*/}
      {/* New Blogs */}
      <NewBlogCards />
    </>
  )
}

export default Home
