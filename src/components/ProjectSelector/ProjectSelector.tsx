import { FC } from 'react';
import cn from 'classnames';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { title, projects } from './ProjectSelector.constants';
import styles from './ProjectSelector.module.scss';

export const ProjectSelector: FC = () => (
  <div className={styles.projectSelector}>
    <div className={styles.header}>
      <div className={styles.title}>
        <div className={styles.name}>{title.name}</div>
        <div className={styles.description}>{title.description}</div>
      </div>
      <button type="button" className={styles.dropdownButton}>
        <KeyboardArrowDownIcon className={styles.dropdownIcon} />
      </button>
    </div>
    <ul className={styles.projectList}>
      {projects.map((project) => (
        <li
          key={project.id}
          className={cn(styles.projectItem, {
            [styles.projectItem_active]: project.isActive,
          })}
        >
          <DashboardIcon className={styles.projectIcon} />
          {project.title}
        </li>
      ))}
    </ul>
  </div>
);
