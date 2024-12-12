import dynamic from 'next/dynamic';
import { memo } from 'react';

const LogoIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.LogoIcon
      ),
    { ssr: false }
  )
);
const HomeIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.HomeIcon
      ),
    { ssr: false }
  )
);
const ExitIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ExitIcon
      ),
    { ssr: false }
  )
);
const EnterIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.EnterIcon
      ),
    { ssr: false }
  )
);
const CogIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then((e) => e.CogIcon),
    { ssr: false }
  )
);
const CamerasIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.CamerasIcon
      ),
    { ssr: false }
  )
);
const SettingsIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.SettingsIcon
      ),
    { ssr: false }
  )
);
const CameraIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.CameraIcon
      ),
    { ssr: false }
  )
);
const MenuIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.MenuIcon
      ),
    { ssr: false }
  )
);
const CloseIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.CloseIcon
      ),
    { ssr: false }
  )
);
const InfoIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.InfoIcon
      ),
    { ssr: false }
  )
);
const OkayIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.OkayIcon
      ),
    { ssr: false }
  )
);
const LightningIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.LightningIcon
      ),
    { ssr: false }
  )
);
const ErrorIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ErrorIcon
      ),
    { ssr: false }
  )
);
const UserIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.UserIcon
      ),
    { ssr: false }
  )
);
const UsersIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.UsersIcon
      ),
    { ssr: false }
  )
);
const CopyIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.CopyIcon
      ),
    { ssr: false }
  )
);
const SunIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then((e) => e.SunIcon),
    { ssr: false }
  )
);
const MoonIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.MoonIcon
      ),
    { ssr: false }
  )
);
const StarIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.StarIcon
      ),
    { ssr: false }
  )
);
const CrossStareIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.CrossStareIcon
      ),
    { ssr: false }
  )
);
const EditIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.EditIcon
      ),
    { ssr: false }
  )
);
const TrashCanIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.TrashCanIcon
      ),
    { ssr: false }
  )
);
const EyeIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then((e) => e.EyeIcon),
    { ssr: false }
  )
);
const EyeCloseIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.EyeCloseIcon
      ),
    { ssr: false }
  )
);
const HideIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.HideIcon
      ),
    { ssr: false }
  )
);
const PhoneIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.PhoneIcon
      ),
    { ssr: false }
  )
);
const ClockIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ClockIcon
      ),
    { ssr: false }
  )
);
const MapMarkerIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.MapMarkerIcon
      ),
    { ssr: false }
  )
);
const EmailIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.EmailIcon
      ),
    { ssr: false }
  )
);
const BookIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.BookIcon
      ),
    { ssr: false }
  )
);
const BlocksIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.BlocksIcon
      ),
    { ssr: false }
  )
);
const DocIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then((e) => e.DocIcon),
    { ssr: false }
  )
);
const ArrowLeftIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ArrowLeftIcon
      ),
    { ssr: false }
  )
);
const ArrowRightIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ArrowRightIcon
      ),
    { ssr: false }
  )
);
const ArrowSolidIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ArrowSolidIcon
      ),
    { ssr: false }
  )
);
const ShrinkOnIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ShrinkOnIcon
      ),
    { ssr: false }
  )
);
const ShrinkOffIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.ShrinkOffIcon
      ),
    { ssr: false }
  )
);

const SearchIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.SearchIcon
      ),
    { ssr: false }
  )
);

const AddIcon = memo(
  dynamic(
    () =>
      import('@/app/_views/_ui/svg_dynamic/svgs.module').then(
        (e) => e.AddIcon
      ),
    { ssr: false }
  )
);



export {
  LogoIcon,
  HomeIcon,
  ExitIcon,
  EnterIcon,
  CogIcon,
  CamerasIcon,
  SettingsIcon,
  CameraIcon,
  MenuIcon,
  CloseIcon,
  InfoIcon,
  OkayIcon,
  LightningIcon,
  ErrorIcon,
  UserIcon,
  UsersIcon,
  CopyIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
  CrossStareIcon,
  EditIcon,
  TrashCanIcon,
  EyeIcon,
  EyeCloseIcon,
  HideIcon,
  PhoneIcon,
  ClockIcon,
  MapMarkerIcon,
  EmailIcon,
  BookIcon,
  BlocksIcon,
  DocIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSolidIcon,
  ShrinkOnIcon,
  ShrinkOffIcon,
  SearchIcon,
  AddIcon,
};
