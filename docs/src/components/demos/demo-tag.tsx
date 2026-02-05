'use client'

import * as React from 'react'
import { Tag, TagIcon, TagClose, type TagProps } from '@/components/ui/tag'

// --- Demo Wrapper ---

interface DemoTagProps extends TagProps {
  // Add any specific props needed for the demo wrapper if any,
  // otherwise it just passes through to Tag
}

export function DemoTag(props: DemoTagProps) {
  return <Tag {...props} />
}
