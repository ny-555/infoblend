import { cn } from "@/lib/utils";

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>;

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {children}
    </div>
  );
}
