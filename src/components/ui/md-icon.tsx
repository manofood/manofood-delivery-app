import React from 'react'
import * as materialDesignIcons from 'react-icons/md'
import { cn } from '@/shared/utils/style'

export type MdIconNames = keyof typeof materialDesignIcons

export interface MdIconProps extends React.SVGProps<SVGSVGElement> {
  name: MdIconNames
}

const MdIcon = React.forwardRef<SVGSVGElement | null, MdIconProps>(({ name, ...props }, ref) => {
  const IconComponent = materialDesignIcons[name]
  const Element = IconComponent as React.ElementType<Omit<MdIconProps, 'name'>>
  return <Element data-testid="MdIcon" ref={ref} {...props} className={cn(props.className, 'unmask-me')} />
})

MdIcon.displayName = 'MdIcon'

export { MdIcon }
