import type { ChakraZone } from "./types";

export interface ZoneConfig {
  label: string;
  title: string;
  desc: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  guideRx: number;
  guideRy: number;
}

export const SVG_CENTER_X = 280;

const ZONE_DESC =
  "在这里，把念头、感受与身体牵引，轻轻记下来。它可以是念头、画面、计划、担心，也可以只是一个模糊的感觉。不必准确，只是让它此刻被看见。";

/** 96dpi 下 1mm ≈ 3.78 viewBox 单位（stage 高度 700px 与 viewBox 等高缩放） */
const MM = 96 / 25.4;

/** 三个脉轮点在同一条中轴线上，按毫米微调以贴合能量体图片 */
export const CHAKRA_CYS = {
  thirdEye: Math.round(134 + 2 * MM), // 眉心轮再下移 1mm
  heart: 332, // 心轮位置已确认
  navel: Math.round(489 - 0.2 * MM), // 脐轮再上移 0.2mm
} as const;

export const zones: Record<ChakraZone, ZoneConfig> = {
  thirdEye: {
    label: "上",
    title: "把注意力放在上",
    desc: ZONE_DESC,
    cx: SVG_CENTER_X,
    cy: CHAKRA_CYS.thirdEye,
    rx: 132,
    ry: 25,
    guideRx: 150,
    guideRy: 28,
  },
  heart: {
    label: "中",
    title: "把注意力放在中",
    desc: ZONE_DESC,
    cx: SVG_CENTER_X,
    cy: CHAKRA_CYS.heart,
    rx: 148,
    ry: 28,
    guideRx: 168,
    guideRy: 31,
  },
  navel: {
    label: "下",
    title: "把注意力放在下",
    desc: ZONE_DESC,
    cx: SVG_CENTER_X,
    cy: CHAKRA_CYS.navel,
    rx: 148,
    ry: 28,
    guideRx: 168,
    guideRy: 31,
  },
};

export const ZONE_ORDER: ChakraZone[] = ["thirdEye", "heart", "navel"];

export const emptyEntries = (): import("./types").ChakraEntries => ({
  thirdEye: [],
  heart: [],
  navel: [],
});
