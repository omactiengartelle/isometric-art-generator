#!/usr/bin/env node
import process from 'node:process';

const DEFAULT_PROMPT = 'isometric illustration, clean vector-style 3d perspective, vibrant flat colors, soft shading, geometric precision, studio lighting, modern saas-style design, crisp edges, white background';

const SIZES = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

function parseArgs(argv) {
  const args = { positional: [], size: 'square', token: null, ref: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--size') args.size = argv[++i];
    else if (a === '--token') args.token = argv[++i];
    else if (a === '--ref') args.ref = argv[++i];
    else args.positional.push(a);
  }
  return args;
}

async function main() {
  const argv = process.argv.slice(2);
  const { positional, size, token: tokenFlag, ref } = parseArgs(argv);

  const userPrompt = positional.join(' ').trim();
  const PROMPT = userPrompt
    ? `${DEFAULT_PROMPT}, ${userPrompt}`
    : DEFAULT_PROMPT;

  const TOKEN = tokenFlag;

  if (!TOKEN) {
    console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
    console.error('  Get yours at: https://www.neta.art/open/');
    process.exit(1);
  }

  const dims = SIZES[size] || SIZES.square;

  const headers = {
    'x-token': TOKEN,
    'x-platform': 'nieta-app/web',
    'content-type': 'application/json',
  };

  const body = {
    storyId: 'DO_NOT_USE',
    jobType: 'universal',
    rawPrompt: [{ type: 'freetext', value: PROMPT, weight: 1 }],
    width: dims.width,
    height: dims.height,
    meta: { entrance: 'PICTURE,VERSE' },
    context_model_series: '8_image_edit',
  };

  if (ref) {
    body.inherit_params = { collection_uuid: ref, picture_uuid: ref };
  }

  console.error(`→ Submitting prompt (${dims.width}×${dims.height})…`);

  const submitRes = await fetch('https://api.talesofai.com/v3/make_image', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!submitRes.ok) {
    const errText = await submitRes.text();
    console.error(`✗ Submit failed (${submitRes.status}): ${errText}`);
    process.exit(1);
  }

  const submitText = await submitRes.text();
  let taskUuid;
  try {
    const parsed = JSON.parse(submitText);
    taskUuid = typeof parsed === 'string' ? parsed : parsed.task_uuid;
  } catch {
    taskUuid = submitText.replace(/^"|"$/g, '').trim();
  }

  if (!taskUuid) {
    console.error(`✗ No task_uuid in response: ${submitText}`);
    process.exit(1);
  }

  console.error(`→ Task ${taskUuid}, polling…`);

  for (let attempt = 0; attempt < 90; attempt++) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(
      `https://api.talesofai.com/v1/artifact/task/${taskUuid}`,
      { headers },
    );

    if (!pollRes.ok) {
      console.error(`  poll ${attempt + 1}: HTTP ${pollRes.status}`);
      continue;
    }

    const data = await pollRes.json();
    const status = data.task_status;

    if (status === 'PENDING' || status === 'MODERATION') {
      if (attempt % 5 === 0) console.error(`  poll ${attempt + 1}: ${status}`);
      continue;
    }

    const url =
      (data.artifacts && data.artifacts[0] && data.artifacts[0].url) ||
      data.result_image_url;

    if (url) {
      console.log(url);
      process.exit(0);
    }

    console.error(`✗ Task ended with status "${status}" but no image URL`);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.error('✗ Timed out after 90 polls (~3 min)');
  process.exit(1);
}

main().catch((err) => {
  console.error(`✗ Error: ${err.message}`);
  process.exit(1);
});
