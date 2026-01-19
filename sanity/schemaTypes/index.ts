import { type SchemaTypeDefinition } from 'sanity'

import { departmentType } from './departmentType'
import { programType } from './programType'
import { eventType } from './eventType'
import { careerType } from './careerType'
import { learningInstitutionType } from './learningInstitutionType'
import { courseType } from './courseType'
import { industrialAttachmentType } from './industrialAttachmentType'
import { teamMemberType } from './teamMemberType'
import { partnerType } from './partnerType'
import { heroImageType } from './heroImageType'
import { eventsHeroImageType } from './eventsHeroImageType'
import { programsHeroImageType } from './programsHeroImageType'
import { programsPageType } from './programsPageType'
import { programItemType } from './programItemType'
import { impactHeroImageType } from './impactHeroImageType'
import { impactStatType } from './impactStatType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content
    departmentType,
    programType,
    eventType,
    careerType,
    // Education
    learningInstitutionType,
    courseType,
    // Applications
    industrialAttachmentType,
    // Organization
    teamMemberType,
    partnerType,
    // Homepage
    heroImageType,
    // Events Page
    eventsHeroImageType,
    // Programs Page
    programsHeroImageType,
    programsPageType,
    programItemType,
    // Impact Page
    impactHeroImageType,
    impactStatType,
  ],
}
