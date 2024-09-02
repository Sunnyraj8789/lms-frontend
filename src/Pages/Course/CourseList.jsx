import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList(){
    const dispatch=useDispatch();
    const {courseData}=useSelector((state)=>state.course);

   async function loadCourses(){

        await dispatch(getAllCourses());
    }
    
    useEffect(()=>{
        loadCourses();
    },[]);

    return (
        <HomeLayout>
            <div className="min-h-[100vh] pt-12 pl-28 flex flex-col text-white gap-10">
                <h1 className="text-center text-3xl font-semibold mb-5">Explore the Courses made by 
                    <span className="font-bold text-yellow-500">
                        Industry experts
                    </span>
                    </h1>
                    <div className="m-10 flex flex-wrap gap-14 ">

                        {courseData?.map((element)=>{
                            return <CourseCard key={element._id} data={element}/>
                        })}
                    </div>
            </div>
        </HomeLayout>
    );

}

export default CourseList;