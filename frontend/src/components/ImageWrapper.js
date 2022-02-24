function ImageWrapper({ url, maxWidth }) {
	return (
		<img className="photo"
            style={{
                maxWidth:maxWidth
            }}
            src={url}
            alt="new"
        />
	)
}

export default ImageWrapper