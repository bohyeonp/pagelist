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
        }
    },
    reducers: {
        setProjectData: (state, action) => {
            state.projectData = action.payload;
        },
        setProjectList : (state, action) => {
            state.projectList = action.payload;
        }
    }
});

export const {setProjectData, setProjectList} = postSlice.actions;
export const selectProjectData = state => state.post.projectData;
export const selectProjectList = state => state.post.projectList;

export {commonSlice,postSlice};
