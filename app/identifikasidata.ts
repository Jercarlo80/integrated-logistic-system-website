// lib/identifikasiData.ts

export type TreeNode = {
  id: string;
  title: string;
  code: number[];
  depth: number;
  route: string;
  children: TreeNode[];
};

export const RAW_IDENTIFIKASI = `
1 0 0 0 0 0 MARKAS BESAR TNI
1 3 1 0 0 0 SATUAN KOMUNIKASI DAN ELEKTRONIKA TNI
1 3 1 1 0 0 UNSUR PIMPINAN
1 3 1 2 0 0 UNSUR PEMBANTU PIMPINAN
1 3 1 2 1 0 SOPS
1 3 1 2 2 0 SMIN
1 3 1 3 0 0 UNSUR PELAYANAN
1 3 1 3 1 0 SEKRETARIAT
1 3 1 3 2 0 KOMPI MARKAS
1 3 1 4 0 0 UNSUR PELAKSANA
1 3 1 4 1 0 DISKOM
1 3 1 4 2 0 DISLEK
1 3 1 4 3 0 DISPERNIKA
1 3 1 4 4 0 DENKOMYANLAP
1 3 1 4 5 0 DENKOMLAOPS
1 3 1 4 6 0 DENPERNIKA
1 3 1 4 7 0 DENKONHARSTAL
1 3 1 4 8 0 DENGUDBEK
1 3 1 4 9 0 DENKOMSAT
1 3 1 4 10 0 DENKOMLEKSTRADA BANDA ACEH
1 3 1 4 11 0 SUBDEN LHOKSEUMAWE
1 3 1 4 12 0 SUBDEN MEULABOH
1 3 1 4 13 0 SUBDEN SABANG
1 3 1 4 14 0 DENKOMLEKSTRADA MEDAN
1 3 1 4 15 0 SUBDEN PADANG
1 3 1 4 16 0 SUBDEN PEKANBARU
1 3 1 4 17 0 SUBDEN TANJUNG PINANG
1 3 1 4 18 0 DENKOMLEKSTRADA PALEMBANG
1 3 1 4 19 0 DENKOMLEKSTRADA BANDUNG
1 3 1 4 20 0 DENKOMLEKSTRADA SEMARANG
1 3 1 4 21 0 SUBDEN YOGYAKARTA
1 3 1 4 22 0 DENKOMLEKSTRADA SURABAYA
1 3 1 4 23 0 SUBDEN MADIUN
1 3 1 4 24 0 SUBDEN MALANG
1 3 1 4 25 0 DENKOMLEKSTRADA BALIKPAPAN
1 3 1 4 26 0 SUBDEN BANJARMASIN
1 3 1 4 27 0 DENKOMLEKSTRADA PONTIANAK
1 3 1 4 28 0 DENKOMLEKSTRADA MAKASAR
1 3 1 4 29 0 DENKOMLEKSTRADA MANADO
1 3 1 4 30 0 DENKOMLEKSTRADA DENPASAR
1 3 1 4 31 0 SUBDEN KUPANG
1 3 1 4 32 0 SUBDEN ATAMBUA
1 3 1 4 33 0 DENKOMLEKSTRADA AMBON
1 3 1 4 34 0 DENKOMLEKSTRADA JAYAPURA
1 3 1 4 35 0 SUBDEN SENTANI
1 3 1 4 36 0 SUBDEN BIAK
1 3 1 4 37 0 DENKOMLEKSTRADA SORONG
`;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLogicalCode(code: number[]): number[] {
  return code.filter((n) => n !== 0);
}

function isPrefix(prefix: number[], code: number[]): boolean {
  if (prefix.length >= code.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (prefix[i] !== code[i]) return false;
  }
  return true;
}

function compareCodePath(a: number[], b: number[]) {
  const aSeq = getLogicalCode(a);
  const bSeq = getLogicalCode(b);

  const len = Math.min(aSeq.length, bSeq.length);

  for (let i = 0; i < len; i += 1) {
    if (aSeq[i] !== bSeq[i]) {
      return aSeq[i] - bSeq[i];
    }
  }

  return aSeq.length - bSeq.length;
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
  return [...nodes]
    .sort((a, b) => compareCodePath(a.code, b.code))
    .map((node) => ({
      ...node,
      children: sortTree(node.children),
    }));
}

// Hitung depth berdasarkan posisi dalam tree (bukan jumlah angka non-zero)
function assignDisplayDepth(nodes: TreeNode[], depth = 1): TreeNode[] {
  return nodes.map((node) => ({
    ...node,
    depth,
    children: assignDisplayDepth(node.children, depth + 1),
  }));
}

export function parseTree(raw: string): TreeNode[] {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const parsed = lines.map((line, idx) => {
    const match = line.match(/^(\d+(?:\s+\d+){5})\s+(.+)$/);
    if (!match) throw new Error(`Invalid line ${idx + 1}: ${line}`);

    const code = match[1].split(/\s+/).map(Number);

    const title = match[2]
      .split(/\s*=\s*/)
      .shift()
      ?.trim() as string;

    const nodeKey = getLogicalCode(code).join("-");
    const route = `/datakoleksimaterial/${nodeKey}-${slugify(title)}`;

    return {
      id: `${code.join("-")}-${idx}`,
      title,
      code,
      depth: 0,
      route,
      children: [],
    } satisfies TreeNode;
  });

  const root: TreeNode[] = [];
  const stack: TreeNode[] = [];

  for (const node of parsed) {
    const currentLogical = getLogicalCode(node.code);

    // Pop sampai menemukan parent yang tepat (prefix dari currentLogical)
    while (stack.length > 0) {
      const lastNode = stack[stack.length - 1];
      const lastLogical = getLogicalCode(lastNode.code);
      if (isPrefix(lastLogical, currentLogical)) {
        break;
      }
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  const sorted = sortTree(root);
  // Hitung depth berdasarkan posisi tree (root depth = 1)
  return assignDisplayDepth(sorted, 1);
}

export function findNodeBySlug(
  nodes: TreeNode[],
  slug: string
): TreeNode | null {
  for (const node of nodes) {
    const nodeSlug = `${getLogicalCode(node.code).join("-")}-${slugify(
      node.title
    )}`;

    if (nodeSlug === slug) return node;

    const found = findNodeBySlug(node.children, slug);
    if (found) return found;
  }

  return null;
}

export function getLevelLabel(depth: number) {
  const labels: Record<number, string> = {
    1: "BAGIAN",
    2: "BIDANG",
    3: "SUB BIDANG",
    4: "SUB SUB BIDANG",
  };
  return labels[depth] ?? `LEVEL ${depth}`;
}

export const IDENTIFIKASI_TREE = parseTree(RAW_IDENTIFIKASI);