import reducer, { initialState } from '.'
import * as actions from './actions'
import * as creators from './creators'

describe('Testing reducer cases', () => {
  // state to be passed to each case then we the state change as in the real user interaction flow
  // not only using the initialState on the reducer
  let state = initialState

  it('should return correct state for UPLOAD_FILE case', () => {
    state = reducer(state, { type: actions.UPLOAD_FILE })
    expect(state).toEqual({
      isUploading: true,
      uploadedSuccessfully: false,
      isChoosingFormat: false,
      isConvertingFile: false,
      convertedSuccessfully: false,
      allowDownloadRequest: false,
      progress: 0,
    })
  })

  it('should return correct state for HAS_UPLOADED_FILE case', () => {
    state = reducer(state, { type: actions.HAS_UPLOADED_FILE })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: true,
      isChoosingFormat: false,
      isConvertingFile: false,
      convertedSuccessfully: false,
      allowDownloadRequest: false,
      progress: 0,
    })
  })

  it('should return correct state for CHOOSE_FORMAT case', () => {
    state = reducer(state, { type: actions.CHOOSE_FORMAT })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: false,
      isChoosingFormat: true,
      isConvertingFile: false,
      convertedSuccessfully: false,
      allowDownloadRequest: false,
      progress: 0,
    })
  })

  it('should return correct state for CONVERT_FILE case', () => {
    state = reducer(state, { type: actions.CONVERT_FILE })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: false,
      isChoosingFormat: false,
      isConvertingFile: true,
      convertedSuccessfully: false,
      allowDownloadRequest: false,
      progress: 0,
    })
  })

  it('should return correct state for HAS_CONVERTED_FILE case', () => {
    state = reducer(state, { type: actions.HAS_CONVERTED_FILE })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: false,
      isChoosingFormat: false,
      isConvertingFile: false,
      convertedSuccessfully: true,
      allowDownloadRequest: false,
      progress: 0,
    })
  })

  it('should return correct state for ALLOW_DOWNLOAD_REQUEST case', () => {
    state = reducer(state, {
      type: actions.ALLOW_DOWNLOAD_REQUEST,
    })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: false,
      isChoosingFormat: false,
      isConvertingFile: false,
      convertedSuccessfully: false,
      allowDownloadRequest: true,
      progress: 0,
    })
  })

  it('should return correct state for UPDATE_PROGRESS case', () => {
    state = reducer(state, { type: actions.UPDATE_PROGRESS, payload: 10 })
    expect(state).toEqual({
      isUploading: false,
      uploadedSuccessfully: false,
      isChoosingFormat: false,
      isConvertingFile: false,
      convertedSuccessfully: false,
      allowDownloadRequest: true,
      progress: 10,
    })
  })
})

describe('Testing actions creators returns', () => {
  it('should return correct action for uploadFile', () => {
    expect(creators.uploadFile()).toEqual({ type: actions.UPLOAD_FILE })
  })

  it('should return correct action for hasUploadedFile', () => {
    expect(creators.hasUploadedFile()).toEqual({
      type: actions.HAS_UPLOADED_FILE,
    })
  })

  it('should return correct action for chooseFormat', () => {
    expect(creators.chooseFormat()).toEqual({ type: actions.CHOOSE_FORMAT })
  })

  it('should return correct action for convertFile', () => {
    expect(creators.convertFile()).toEqual({ type: actions.CONVERT_FILE })
  })

  it('should return correct action for hasConvertedFile', () => {
    expect(creators.hasConvertedFile()).toEqual({
      type: actions.HAS_CONVERTED_FILE,
    })
  })

  it('should return correct action for allowDownloadRequest', () => {
    expect(creators.allowDownloadRequest()).toEqual({
      type: actions.ALLOW_DOWNLOAD_REQUEST,
    })
  })

  it('should return correct action for updateProgress', () => {
    expect(creators.updateProgress(10)).toEqual({
      type: actions.UPDATE_PROGRESS,
      payload: 10,
    })
  })
})
