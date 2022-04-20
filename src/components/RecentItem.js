import { useNavigate, generatePath } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";



const RecentItem = ({ type, item }) => {
  const navigate = useNavigate();
  const onClick = () => {



    switch (type) {
      case 'lca':
        console.log("LCA")
        break;
      case 'screening':
        console.log("SCREENING")
        break;
      case 'costs':
        navigate(generatePath('cost/:costid', { costid: item.id }))
        break;
    }
  }

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9"
    }
  }));

  return (
    <div>
      <HtmlTooltip
        title={
          <div>
            <p>Last edit on {item.lastEdit}</p>
          </div>
        }
        placement="right"
        arrow
      >
        <div className='recent-item' onClick={onClick} >{item.name} </div>
      </HtmlTooltip>


    </div>
  )
}

export default RecentItem