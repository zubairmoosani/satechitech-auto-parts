import {
    findAllParent,
    findMenuItem,
    getHelpMenuItems,
    getMenuItemFromURL,
    type MenuItemType,
} from "@/helpers/menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "react-bootstrap";
import { FaChevronDown, FaEllipsis } from "react-icons/fa6";

type SubMenus = {
  item: MenuItemType;
  itemClassName?: string;
  linkClassName?: string;
  activeMenuItems?: Array<string>;
  level: number;
};

type AppMenuProps = {
  showExtraPages?: boolean;
  startBookingMenu?: boolean;
  mobileMenuOpen: boolean;
  menuClassName?: string;
};

const MenuItemWithChildren = ({
  item,
  activeMenuItems,
  itemClassName,
  linkClassName,
  level,
}: SubMenus) => {
  const level1 = level === 1;

  return (
    <Dropdown
      as="li"
      className={itemClassName}
      drop={level >= 2 ? "end" : undefined}
    >
      <DropdownToggle
        as={Link}
        className={linkClassName}
        href=""
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {item.label}
        {level1 ? <FaChevronDown size={12} /> : <FaEllipsis size={14} />}
      </DropdownToggle>
      <DropdownMenu
        aria-labelledby="listingMenu"
        data-bs-popper="none"
        renderOnMount
      >
        {(item.children ?? []).map((child, idx) => (
          <Fragment key={idx + child.key + idx}>
            {child.children ? (
              <MenuItemWithChildren
                item={child}
                level={level + 1}
                activeMenuItems={activeMenuItems}
                itemClassName="dropdown-submenu"
                linkClassName={clsx(
                  "dropdown-item dropdown-toggle arrow-none d-flex align-items-center justify-content-between",
                  {
                    active: activeMenuItems?.includes(child.key),
                  }
                )}
              />
            ) : (
              <MenuItem
                item={child}
                level={level + 1}
                linkClassName={clsx(
                  activeMenuItems?.includes(child.key) && "active"
                )}
              />
            )}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const MenuItem = ({ itemClassName, item, linkClassName, level }: SubMenus) => {
  return (
    <li className={itemClassName}>
      <MenuItemLink
        item={item}
        linkClassName={linkClassName}
        level={level + 1}
      />
    </li>
  );
};

const MenuItemLink = ({ item, linkClassName }: SubMenus) => {
  return (
    <DropdownItem
      as={Link}
      href={item.url ?? ""}
      target={item.target}
      className={linkClassName}
    >
      {item.label}
    </DropdownItem>
  );
};

const TopHelpMenu = ({ mobileMenuOpen, menuClassName }: AppMenuProps) => {
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([]);

  const menuItems = getHelpMenuItems();

  const pathname = usePathname();

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    //   const trimmedURL = pathname?.replaceAll(import.meta.env.VITE_BASE_URL ?? '', '')
    const trimmedURL = pathname?.replaceAll("", "");

    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([
          activeMt.key,
          ...findAllParent(menuItems, activeMt),
        ]);
      }
    }
  }, [pathname, menuItems]);

  useEffect(() => {
    activeMenu();
  }, [activeMenu, menuItems]);
  return (
    <>
      <Collapse in={mobileMenuOpen} className="navbar-collapse">
        <div>
          <ul
            className={clsx(
              "navbar-nav navbar-nav-scroll ms-auto",
              menuClassName
            )}
          >
            {(menuItems ?? []).map((item, idx) => {
              return (
                <Fragment key={item.key + idx}>
                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      activeMenuItems={activeMenuItems}
                      level={1}
                      itemClassName="nav-item"
                      linkClassName={clsx(
                        "nav-link arrow-none d-flex align-items-center gap-1",
                        { active: activeMenuItems.includes(item.key) }
                      )}
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      level={1}
                      itemClassName="nav-item"
                      linkClassName={clsx(
                        "nav-link",
                        activeMenuItems.includes(item.key) && "active"
                      )}
                    />
                  )}
                </Fragment>
              );
            })}
          </ul>
        </div>
      </Collapse>
    </>
  );
};

export default TopHelpMenu;
