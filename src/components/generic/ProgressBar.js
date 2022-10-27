import styled from "styled-components";

const BasicContainer = styled.div.attrs(
    props => ({
        style: {
            height: `${props.size}rem` || `0.5rem`,
            borderRadius: `${props.size/2}rem` || `0.25rem`,
            backgroundColor: props.color || 'gray',
        },
    }))`
    font-size: 0.125rem;
    display:block;
    margin-bottom: 1rem;
`
const BasicFIll = styled.div.attrs(
    props => ({
        style: {
            height: `${props.size}rem` || `0.5rem`,
            width: props.width || '',
            borderRadius: `${props.size/2}rem` || `0.25rem`,
            backgroundColor: props.color || 'gray',
        },
    }))`
    font-size: 0.125rem;
    display:block;
`
const SegmentContainer = styled.div`
    display:flex;
    flex:1;
    align-items: stretch;
    column-gap: 0.125rem;
    margin-bottom: 1rem;
`
const Segment = styled.div.attrs(
    props => ({
        style: {
            height: `${props.size}rem` || `0.5rem`,
            borderRadius: `${props.size/2}rem` || `0.25rem`,
            backgroundColor: props.color || 'gray',
        },
    }))`
    flex:1;
    font-size: 0.125rem;
    display:inline-block;
    min-width:  0.125rem;
`


///////////////////////////////////////////////////////////////
//
//  Main: Progress bar component
// 
/** 
 * @param segmented Boolean Is this a segmented progress bar or justr a basic one?
 * @param value Number Current value (for segmented, this uses an index value [-1])
 * @param limit Number The maximum value to reach for completion
 * @param active Boolean Is it in active state?
 * @param done Boolean Has the progress completed?
 * @param size Number The height of the progress bar (in rems)
 * @param defaultColor String CSS color for displaying inactive or incomplete portions
 * @param activeColor String CSS color for highlighting currently active fill indicator
 * @param doneColor String CSS color for highlighting completed fill indicator(s)
 * @returns ProgressBar component
 */

export const ProgressBar = ({ segmented=false, value=0, limit=10, active=false, done=false, size=1, defaultColor='grey', activeColor='green', doneColor='blue' }) => {

    // If its segmented byt has one or less segments, return nothing
    if(segmented && limit <= 1) return '';

    // Get the color to apply to the segment
    const getColor = (index) => {
        if(!segmented) return !active ? defaultColor : done ? doneColor : activeColor;
        if(!active) return defaultColor;
        if(done) return doneColor;
        return index < value ? doneColor : index > value ? defaultColor : activeColor;
    }

    // Return the appropriate progress bar 
    return !segmented ? 
        <BasicContainer size={size} color={defaultColor}>
            <BasicFIll color={getColor()}  size={size} width={`${ (value / limit) * 100 }%`} />
        </BasicContainer>
        :
        <SegmentContainer>
            {
                Array(limit).fill('').map( 
                    (item, index) => <Segment key={index} size={size} color={getColor(index)} /> 
                )
            }
        </SegmentContainer>
}


export default ProgressBar;