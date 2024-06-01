
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function HeaderPagination() {
    return (
        <div className='flex items-center gap-3 mb-10'>
            <span className='transition px-1.5 py-1 bg-[#000000] opacity-50 inline-block rounded-[50%] cursor-pointer hover:opacity-65'>
                <ArrowBackIosNewIcon className='text-white' />
            </span>
            <span className='transition px-1.5 py-1 items-center bg-[#000000] opacity-50 inline-block rounded-[50%] cursor-pointer hover:opacity-65'>
                <ArrowForwardIosIcon className='text-white' />
            </span>
        </div>
    )
}

export default HeaderPagination