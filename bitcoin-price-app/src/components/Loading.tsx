import loadingImage from '/loading.png';

interface Props {}

const Loading = (props: Props) => {
  return (
    <div className='Loading'>
        <img src={loadingImage} alt='loading'/>
    </div>
  )
}

export default Loading