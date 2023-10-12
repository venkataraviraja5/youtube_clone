import { createSlice } from "@reduxjs/toolkit";

export const YoutubeSlice = createSlice({
    name:"app",
    initialState:{
        hamValue:true,
        subscribe:[],
        thumbnails:[],
        history:[],
        searchhistory:[],
       
    },
    reducers:{
       isShow : (state) =>{
         state.hamValue = !state.hamValue
       },
       sidebarshow:(state) =>{
        state.hamValue = false
       },
       sidebarshowwindow:(state) =>{
        state.hamValue = true
       },
       addsubscribe : (state,action) => {
             state.subscribe.push(action.payload)
       },
        unsubscribe : (state,action) => {
         state.subscribe = state.subscribe.filter(item => item[0]?.snippet?.channelId!== action.payload);
       },
       likedthumbnails : (state,action) => {
            state.thumbnails.push(action.payload)
       },
       historyvideos : (state,action) => {
            state.history.push(action.payload)
       },
       searchhistory : (state,action ) => {
        state.searchhistory.push(action.payload)
       }
    
    }
})

export const {isShow,sidebarshow,addsubscribe,unsubscribe,likedthumbnails,historyvideos,searchhistory,sidebarshowwindow} = YoutubeSlice.actions
export default YoutubeSlice.reducer