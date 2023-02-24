import { createSlice} from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        modal : {show : false, type : "", subType : ""},
        isLoggedIn : false
    },
    reducers: {
        setModal : (state, action) => {
            state.modal = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});
export const {setModal, setIsLoggedIn} = commonSlice.actions;
export const selectModal = state => state.common.modal;
export const selectIsLoggedIn = state => state.common.isLoggedIn;

const postSlice = createSlice({
    name: "post",
    initialState: {
        projectList : [],
        projectData : {
            title : "",
            id : ""
        },
        categoryList : [],
        categoryData : {
            title : "",
            id : "",
            parentId : ""
        }
    },
    reducers: {
        setProjectList : (state, action) => {
            state.projectList = action.payload;
        },
        setProjectData: (state, action) => {
            state.projectData = action.payload;
        },
        setCategoryList : (state, action) => {
            state.categoryList = action.payload;
        },
        setCategoryData: (state, action) => {
            state.categoryData = action.payload;
        },
    }
});

export const {setProjectList, setProjectData, setCategoryList, setCategoryData} = postSlice.actions;

export const selectProjectList = state => state.post.projectList;
export const selectProjectData = state => state.post.projectData;
export const selectCategoryList = state => state.post.categoryList;
export const selectCategoryData = state => state.post.categoryData;

export {commonSlice,postSlice};
