import React from 'react'

import ImageUploading from "react-images-uploading";
// { ImageUploadingPropsType, ImageListType, ImageType } is type for typescript

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

class ImageUpload extends React.Component {


    onChange = (imageList) => {
        this.setState(() => {        
            return { imgUrl: imageList[0].dataURL }
        })
    };

    render() {
        return (
            <ImageUploading
                onChange={this.onChange}
                maxNumber={maxNumber}
                maxFileSize={maxMbFileSize}
                acceptType={["jpg", "gif", "png"]}
            >
                {({ imageList, onImageUpload }) => (
                    // write your building UI
                    <div>
                        <button onClick={onImageUpload}>Upload images</button>
                        
                        {imageList.map((image) => (
                            
                            <div key={image.key}>
                                {console.log(image)}
                                <img src={image.dataURL} width="200px" height="200px" alt="img" />
                                <button onClick={image.onUpdate}>Update</button>
                                <button onClick={image.onRemove}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        );
    }
}

export default ImageUpload


