/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { FC } from 'react'
import { useTransition, animated } from 'react-spring'

import Html from '../../components/Html'
import Link from '../../components/Link'
import { External, Github } from '../../components/Icons'
import TagList from '../../components/TagList'
import { getTagsFromRelation } from '../../utils/utils'
import { PrismicProject, ProjectList } from '../../types.d'

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    my: [4, 4, 5]
  },
  col: {
    width: ['full', '1/2', '1/2', '1/3']
  },
  item: {
    m: 3,
    py: 4,
    px: 3,
    bg: 'blue',
    minHeight: '264px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex'
  },
  title: {
    flex: 1
  },
  iconLink: {
    mr: [2, 2, 3, 3],
    '& path': {
      fill: 'white',
      transition: 'fill 200ms'
    },
    '&:hover path': { fill: 'secondary' }
  },
  html: {
    '& p': {
      color: 'muted',
      fontSize: 1,
      mb: 2
    }
  },
  tags: {
    fontSize: 1
  }
}

const Project: FC<PrismicProject> = ({
  data: { title, html, demo_link, source_link, ...rest }
}) => {
  const tags = rest?.relations ? getTagsFromRelation(rest.relations) : null
  return (
    <div sx={style.item}>
      <div>
        <div style={style.header}>
          <Styled.h4 style={style.title}>{title.text}</Styled.h4>
          {demo_link?.url && (
            <Link
              sx={style.iconLink}
              to={demo_link?.url}
              target="_blank"
              title="Voir le site"
            >
              <External size={20} />
            </Link>
          )}
          {source_link?.url && (
            <Link
              sx={style.iconLink}
              to={source_link?.url}
              target="_blank"
              title="Voir le code"
            >
              <Github size={20} />
            </Link>
          )}
        </div>
        {html?.html && <Html style={style.html} html={html.html} />}
      </div>
      <div sx={style.tags}>{tags && <TagList tags={tags} />}</div>
    </div>
  )
}

export interface HomepagePortfolioOthersProps {
  projects: ProjectList
}

const HomepagePortfolioOthers: FC<HomepagePortfolioOthersProps> = ({
  projects
}) => {
  const transitions = useTransition(projects, item => item.uid, {
    unique: true,
    trail: 1200 / projects.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  })

  return (
    <div sx={style.root}>
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props} sx={style.col}>
          <Project {...item} />
        </animated.div>
      ))}
    </div>
  )
}

export default HomepagePortfolioOthers