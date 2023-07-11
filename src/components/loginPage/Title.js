import logoUrl from '../../assets/images/logo.png';

function Title(props) {
    const { title, subTitle } = props;

    return (
        <div className="mb-8 flex flex-col items-center">
            <img src={logoUrl} className="mb-2" width="150" alt="logo" srcSet="" />
            <h1 className="mb-2 text-3xl">{title}</h1>
            <span className="text-gray-300 text-xl">{subTitle} </span>
        </div>
    )
}

export default Title;