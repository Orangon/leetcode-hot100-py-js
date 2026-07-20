// 49. 字母异位词分组
export default {
  id: 49,
  title: '字母异位词分组',
  slug: 'group-anagrams',
  difficulty: 'medium',
  tags: ['数组', '哈希表', '字符串', '排序'],
  hints: [
    '同一组单词虽然字符顺序不同，但每种字母出现的次数完全相同；先寻找一种与排列顺序无关的分组标识。',
    '可以把每个字符串排序后的结果作为哈希键，键相同的原字符串追加到同一个数组中。',
    '遍历 strs，计算 key = sort(s)，用 Map 维护 key 到字符串列表的映射，最后返回所有列表。',
    '不要把结果扁平化或丢掉重复字符串；核心判题忽略组间和组内顺序，但仍严格检查分组边界与元素数量。',
  ],

  description: `
给你一个字符串数组，请你将**字母异位词**组合在一起。可以按任意顺序返回结果列表。

字母异位词是由重新排列源单词的字母得到的一个新单词，源单词中的字母恰好只用一次。例如 \`eat\` 与 \`tea\` 互为字母异位词，而 \`eat\` 与 \`apt\` 不是。

### 示例

- 输入：\`strs = ["eat","tea","tan","ate","nat","bat"]\`，输出：\`[["bat"],["nat","tan"],["ate","eat","tea"]]\`（各组顺序任意，组内顺序任意）
- 输入：\`strs = [""]\`，输出：\`[[""]]\`
- 输入：\`strs = ["a"]\`，输出：\`[["a"]]\`

### 提示

- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` 仅包含小写字母

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（字符串个数）；第二行为 \`n\` 个字符串（空格分隔，字符串内不含空格；当 \`n = 1\` 且唯一的字符串为空串时，该行为空行）
- 输出：每组一行；组内字符串按输入中出现的先后顺序、以空格分隔；所有行先按字典序升序排序再输出

ACM 输入示例：
\`\`\`
6
eat tea tan ate nat bat
\`\`\`
输出：
\`\`\`
bat
eat tea ate
tan nat
\`\`\`
`,

  functionName: 'groupAnagrams',
  compare: 'nestedMultiset',

  tests: [
    { args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] },
    { args: [['']], expected: [['']] },
    { args: [['a']], expected: [['a']] },
    { args: [['ab', 'ba', 'abc', 'acb', 'bca', 'xyz']], expected: [['ab', 'ba'], ['abc', 'acb', 'bca'], ['xyz']] },
    { args: [['aa', 'aa', 'b']], expected: [['aa', 'aa'], ['b']] },
    { args: [['', '', 'a']], expected: [['', ''], ['a']] },
    { args: [['abc', 'abc', 'abc']], expected: [['abc', 'abc', 'abc']] },
    { args: [['ab', 'aab', 'ba', 'aba']], expected: [['ab', 'ba'], ['aab', 'aba']] },
    { args: [['eb', 'ebca', 'd', 'bdebd', 'abd', 'dca', 'cdaa', 'c', 'db', 'bcada', 'debb', 'eca', 'a', 'ccb', 'd', 'ac', 'cdbbaa', 'bacdae', 'db', 'cee', 'ae', 'adaec', 'a', 'eacb', 'ab', 'daeb', 'aa', 'cbae', 'dcecd', 'dde', 'e', 'beadbe', 'addcde', 'dbb', 'ececba', 'eccdbd', 'bbde', 'ebeeed', 'bbedcc', 'cd', 'abea', 'ed', 'bc', 'e', 'aec', 'ec', 'bce', 'd', 'cceaee', 'c', 'dba', 'ecd', 'aae', 'cbced', 'ee', 'ededa', 'bec', 'ad', 'a', 'be', 'e', 'a', 'ad', 'ceeb', 'bc', 'cdd', 'bee', 'cceab', 'c', 'bde', 'acbbb', 'dcec', 'a', 'abeb', 'cce', 'eceeea', 'ebabbe', 'a', 'b', 'ecacb', 'bbadbd', 'ab', 'aedbec', 'ed', 'cee', 'e', 'dd', 'eaecbb', 'becbba', 'c', 'ececd', 'bdb', 'dda', 'be', 'dec', 'e', 'c', 'addeb', 'cae', 'debded', 'dedab', 'bbead', 'ad', 'dea', 'dbebbc', 'eb', 'aad', 'abbc', 'bcadd', 'eca', 'a', 'ee', 'aaa', 'cbbbdd', 'ccbbaa', 'dd', 'bda', 'dc', 'da', 'd', 'ebdead', 'abba', 'bb', 'cb', 'adabb', 'abe', 'cdee', 'eddbad', 'd', 'dc', 'edbb', 'dcbdad', 'eeced', 'ba', 'ecdcc', 'b', 'ab', 'a', 'c', 'dbaaac', 'b', 'daeee', 'baae', 'cc', 'daa', 'cdc', 'cdaa', 'cdb', 'cdbbce', 'abdbc', 'edda', 'dbced', 'decdd', 'cd', 'c', 'ae', 'be', 'dcaa', 'cdbece', 'dbb', 'ed', 'ec', 'c', 'dbabcb', 'bcb', 'aedbc', 'edcb', 'dd', 'db', 'ab', 'a', 'da', 'caca', 'aaccb', 'ccd', 'cca', 'ec', 'dacd', 'a', 'dcdeda', 'eaded', 'ace', 'cdcda', 'eaeb', 'aaed', 'abd', 'adca', 'ebbae', 'accbca', 'babd', 'eaeab', 'ebab', 'e', 'aadabb', 'dccab', 'db', 'aeddad', 'c', 'aabedc', 'cccca', 'edaad', 'acd', 'ccaa', 'aa', 'deddb', 'dcc', 'a', 'dba', 'bddcec', 'eeeac', 'ae', 'acb', 'cd', 'becb', 'a', 'dabaa', 'bcb', 'acdab', 'e', 'a', 'bbdddc', 'c', 'adc', 'aec', 'a', 'd', 'aadd', 'bddae', 'ddccea', 'dce', 'cdabeb', 'bc', 'a', 'ebdaed', 'cecb', 'ddbb', 'a', 'cba', 'acdceb', 'baecbe', 'cebcd', 'ba', 'ebaeb', 'cedaed', 'a', 'abc', 'bd', 'da', 'd', 'dbe', 'cedee', 'ccce', 'e', 'cddebd', 'ee', 'cbe', 'bb', 'cd', 'dcdec', 'da', 'ba', 'eddcc', 'c', 'bbdea', 'ca', 'aa', 'aab', 'bab', 'a', 'ebeb', 'cd', 'cc', 'dbddb', 'e', 'b', 'cd', 'cdc', 'ecaaac', 'babed', 'e', 'deb', 'abcadc', 'dcdccb', 'eba', 'ed', 'ddba', 'abaab', 'dedc', 'bbbac', 'bceeae', 'ded', 'ba', 'aa', 'e', 'c', 'bdbada', 'ebbe', 'ee', 'bddee', 'ebbedd', 'dda', 'c', 'bcd', 'ccabc', 'becbab', 'c', 'cca', 'bbdabe', 'dc', 'abe', 'eeed', 'aebbcd', 'bccea', 'dee', 'da', 'ceebc', 'ce', 'ddedad', 'dddaeb', 'bc', 'bc', 'ebb', 'cce', 'becce', 'adeee', 'ee', 'add', 'ed', 'e', 'cdda', 'babbb', 'e', 'e', 'ca', 'bece', 'aecdb', 'c', 'bdede', 'dbde', 'b', 'ebdccd', 'ce', 'edcd', 'edaede', 'eeeaac', 'dbec', 'dbdd', 'eea', 'dcece', 'aadda', 'dbbeee', 'dddcd', 'ac', 'bcee', 'cdad', 'bcae', 'ae', 'bdcab', 'dde', 'dbd', 'cc', 'dc', 'cc', 'b', 'aceace', 'abdced', 'b', 'dcbee', 'dabab', 'bc', 'ddb', 'adceb', 'abdbc', 'dbdece', 'aba', 'bedde', 'a', 'ceccc', 'acedba', 'ab', 'abcd', 'ac', 'bbbbc', 'deaede', 'baae', 'aed', 'dbac', 'e', 'dbc', 'cd', 'acc', 'c', 'dbee', 'dedee', 'bacadb', 'adb', 'abdcce', 'ccbde', 'aeace', 'ccbd', 'aacade', 'cb', 'dade', 'aeb', 'ccb', 'cc', 'aeae', 'beb', 'b', 'bbbaed', 'cedaba', 'dded', 'aa', 'bc', 'dbda', 'eedecb', 'dbeeee', 'dbb', 'dbddbd', 'abd', 'baebae', 'd', 'c', 'b', 'ecc', 'cbac', 'acaeac', 'dacaba', 'abcdda', 'bc', 'add', 'beeb', 'dbeeb', 'ab', 'ba', 'a', 'dddd', 'ad', 'dbbead', 'dcbea', 'c', 'eecc', 'aa', 'ded', 'bc', 'ecd', 'e', 'ecd', 'edc', 'aeee', 'bede', 'bc', 'aa', 'cedbac', 'abbdc', 'cde', 'dace', 'c', 'eddeaa', 'cbabb', 'cb', 'eebd', 'ccdbcb', 'eeeddc', 'a', 'ebcccd', 'beba', 'a', 'cde', 'dd', 'bdda', 'acbb', 'c', 'eecdd', 'db', 'abbdd', 'd', 'dc', 'acd', 'd', 'eec', 'abdecc', 'acabbe', 'b', 'dbb', 'baab', 'eca', 'dbacaa', 'cccba', 'dcec', 'daaebb', 'bededa', 'daacee', 'acb', 'bdeada', 'e', 'daaec', 'a', 'bbc', 'dd']], expected: [['eb', 'be', 'be', 'eb', 'be'], ['ebca', 'eacb', 'cbae', 'bcae'], ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'], ['bdebd'], ['abd', 'dba', 'bda', 'abd', 'dba', 'adb', 'abd'], ['dca', 'acd', 'adc', 'acd'], ['cdaa', 'cdaa', 'dcaa', 'adca'], ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], ['db', 'db', 'db', 'db', 'bd', 'db'], ['bcada', 'acdab'], ['debb', 'bbde', 'edbb'], ['eca', 'aec', 'cae', 'eca', 'ace', 'aec', 'eca'], ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'], ['ccb', 'ccb'], ['ac', 'ca', 'ca', 'ac', 'ac'], ['cdbbaa', 'bacadb'], ['bacdae', 'aabedc', 'acedba', 'cedaba'], ['cee', 'cee', 'eec'], ['ae', 'ae', 'ae', 'ae'], ['adaec', 'daaec'], ['ab', 'ab', 'ba', 'ab', 'ab', 'ba', 'ba', 'ba', 'ab', 'ab', 'ba'], ['daeb'], ['aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'aa'], ['dcecd', 'dcdec', 'eddcc'], ['dde', 'ded', 'dde', 'ded'], ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'], ['beadbe'], ['addcde', 'dcdeda'], ['dbb', 'bdb', 'dbb', 'dbb', 'dbb'], ['ececba'], ['eccdbd', 'bddcec', 'ebdccd'], ['ebeeed', 'dbeeee'], ['bbedcc', 'cdbbce'], ['cd', 'dc', 'dc', 'cd', 'cd', 'cd', 'cd', 'cd', 'dc', 'dc', 'cd', 'dc'], ['abea', 'baae', 'baae'], ['ed', 'ed', 'ed', 'ed', 'ed'], ['bc', 'bc', 'cb', 'bc', 'bc', 'bc', 'bc', 'cb', 'bc', 'bc', 'bc', 'bc', 'cb'], ['ec', 'ec', 'ec', 'ce', 'ce'], ['bce', 'bec', 'cbe'], ['cceaee'], ['ecd', 'dec', 'dce', 'ecd', 'ecd', 'edc', 'cde', 'cde'], ['aae'], ['cbced', 'cebcd', 'ccbde'], ['ee', 'ee', 'ee', 'ee', 'ee'], ['ededa', 'eaded'], ['ad', 'ad', 'ad', 'da', 'da', 'da', 'da', 'da', 'ad'], ['ceeb', 'bece', 'bcee'], ['cdd'], ['bee'], ['cceab', 'ecacb', 'bccea'], ['bde', 'dbe', 'deb'], ['acbbb', 'bbbac', 'cbabb'], ['dcec', 'dcec'], ['abeb', 'ebab', 'beba'], ['cce', 'cce', 'ecc'], ['eceeea'], ['ebabbe'], ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'], ['bbadbd'], ['aedbec'], ['dd', 'dd', 'dd', 'dd', 'dd'], ['eaecbb', 'baecbe'], ['becbba', 'becbab'], ['ececd', 'dcece'], ['dda', 'dda', 'add', 'add'], ['addeb', 'dedab', 'bddae'], ['debded'], ['bbead', 'bbdea', 'babed'], ['dea', 'aed'], ['dbebbc'], ['aad', 'daa'], ['abbc', 'acbb'], ['bcadd'], ['aaa'], ['cbbbdd'], ['ccbbaa'], ['ebdead', 'ebdaed', 'bededa'], ['abba', 'baab'], ['bb', 'bb'], ['adabb', 'dabab'], ['abe', 'eba', 'abe', 'aeb'], ['cdee'], ['eddbad', 'dddaeb'], ['dcbdad'], ['eeced', 'cedee'], ['ecdcc'], ['dbaaac', 'dacaba', 'dbacaa'], ['daeee', 'adeee'], ['cc', 'cc', 'cc', 'cc', 'cc'], ['cdc', 'ccd', 'dcc', 'cdc'], ['cdb', 'bcd', 'dbc'], ['abdbc', 'bdcab', 'abdbc', 'abbdc'], ['edda', 'dade'], ['dbced'], ['decdd'], ['cdbece'], ['dbabcb'], ['bcb', 'bcb', 'bbc'], ['aedbc', 'aecdb', 'adceb', 'dcbea'], ['edcb', 'dbec'], ['caca', 'ccaa'], ['aaccb'], ['cca', 'cca', 'acc'], ['dacd', 'cdda', 'cdad'], ['cdcda'], ['eaeb'], ['aaed'], ['ebbae', 'ebaeb'], ['accbca'], ['babd'], ['eaeab'], ['aadabb'], ['dccab'], ['aeddad'], ['cccca'], ['edaad'], ['deddb'], ['eeeac'], ['acb', 'cba', 'abc', 'acb'], ['becb'], ['dabaa'], ['bbdddc'], ['aadd'], ['ddccea'], ['cdabeb', 'aebbcd'], ['cecb'], ['ddbb'], ['acdceb', 'abdcce', 'cedbac', 'abdecc'], ['cedaed'], ['ccce'], ['cddebd'], ['aab', 'aba'], ['bab'], ['ebeb', 'ebbe', 'beeb'], ['dbddb'], ['ecaaac', 'acaeac'], ['abcadc'], ['dcdccb'], ['ddba', 'dbda', 'bdda'], ['abaab'], ['dedc', 'edcd'], ['bceeae'], ['bdbada'], ['bddee', 'bdede', 'bedde'], ['ebbedd'], ['ccabc', 'cccba'], ['bbdabe', 'bbbaed'], ['eeed'], ['dee'], ['ceebc', 'becce'], ['ddedad'], ['ebb', 'beb'], ['babbb'], ['dbde'], ['edaede', 'deaede'], ['eeeaac'], ['dbdd'], ['eea'], ['aadda'], ['dbbeee'], ['dddcd'], ['dbd', 'ddb'], ['aceace'], ['abdced'], ['dcbee'], ['dbdece'], ['ceccc'], ['abcd', 'dbac'], ['bbbbc'], ['dbee', 'bede', 'eebd'], ['dedee'], ['aeace'], ['ccbd'], ['aacade'], ['aeae'], ['dded'], ['eedecb'], ['dbddbd'], ['baebae'], ['cbac'], ['abcdda'], ['dbeeb'], ['dddd'], ['dbbead'], ['eecc'], ['aeee'], ['dace'], ['eddeaa'], ['ccdbcb'], ['eeeddc'], ['ebcccd'], ['eecdd'], ['abbdd'], ['acabbe'], ['daaebb'], ['daacee'], ['bdeada']] },
  ],

  acmTests: [
    { input: '6\neat tea tan ate nat bat\n', output: 'bat\neat tea ate\ntan nat\n' },
    { input: '1\n\n', output: '\n' },
    { input: '1\na\n', output: 'a\n' },
    { input: '6\nab ba abc acb bca xyz\n', output: 'ab ba\nabc acb bca\nxyz\n' },
    { input: '3\naa aa b\n', output: 'aa aa\nb\n' },
    { input: '3\n  a\n', output: ' \na\n' },
    { input: '3\nabc abc abc\n', output: 'abc abc abc\n' },
    { input: '4\nab aab ba aba\n', output: 'aab aba\nab ba\n' },
    { input: '500\neb ebca d bdebd abd dca cdaa c db bcada debb eca a ccb d ac cdbbaa bacdae db cee ae adaec a eacb ab daeb aa cbae dcecd dde e beadbe addcde dbb ececba eccdbd bbde ebeeed bbedcc cd abea ed bc e aec ec bce d cceaee c dba ecd aae cbced ee ededa bec ad a be e a ad ceeb bc cdd bee cceab c bde acbbb dcec a abeb cce eceeea ebabbe a b ecacb bbadbd ab aedbec ed cee e dd eaecbb becbba c ececd bdb dda be dec e c addeb cae debded dedab bbead ad dea dbebbc eb aad abbc bcadd eca a ee aaa cbbbdd ccbbaa dd bda dc da d ebdead abba bb cb adabb abe cdee eddbad d dc edbb dcbdad eeced ba ecdcc b ab a c dbaaac b daeee baae cc daa cdc cdaa cdb cdbbce abdbc edda dbced decdd cd c ae be dcaa cdbece dbb ed ec c dbabcb bcb aedbc edcb dd db ab a da caca aaccb ccd cca ec dacd a dcdeda eaded ace cdcda eaeb aaed abd adca ebbae accbca babd eaeab ebab e aadabb dccab db aeddad c aabedc cccca edaad acd ccaa aa deddb dcc a dba bddcec eeeac ae acb cd becb a dabaa bcb acdab e a bbdddc c adc aec a d aadd bddae ddccea dce cdabeb bc a ebdaed cecb ddbb a cba acdceb baecbe cebcd ba ebaeb cedaed a abc bd da d dbe cedee ccce e cddebd ee cbe bb cd dcdec da ba eddcc c bbdea ca aa aab bab a ebeb cd cc dbddb e b cd cdc ecaaac babed e deb abcadc dcdccb eba ed ddba abaab dedc bbbac bceeae ded ba aa e c bdbada ebbe ee bddee ebbedd dda c bcd ccabc becbab c cca bbdabe dc abe eeed aebbcd bccea dee da ceebc ce ddedad dddaeb bc bc ebb cce becce adeee ee add ed e cdda babbb e e ca bece aecdb c bdede dbde b ebdccd ce edcd edaede eeeaac dbec dbdd eea dcece aadda dbbeee dddcd ac bcee cdad bcae ae bdcab dde dbd cc dc cc b aceace abdced b dcbee dabab bc ddb adceb abdbc dbdece aba bedde a ceccc acedba ab abcd ac bbbbc deaede baae aed dbac e dbc cd acc c dbee dedee bacadb adb abdcce ccbde aeace ccbd aacade cb dade aeb ccb cc aeae beb b bbbaed cedaba dded aa bc dbda eedecb dbeeee dbb dbddbd abd baebae d c b ecc cbac acaeac dacaba abcdda bc add beeb dbeeb ab ba a dddd ad dbbead dcbea c eecc aa ded bc ecd e ecd edc aeee bede bc aa cedbac abbdc cde dace c eddeaa cbabb cb eebd ccdbcb eeeddc a ebcccd beba a cde dd bdda acbb c eecdd db abbdd d dc acd d eec abdecc acabbe b dbb baab eca dbacaa cccba dcec daaebb bededa daacee acb bdeada e daaec a bbc dd\n', output: 'a a a a a a a a a a a a a a a a a a a a a a a\naa aa aa aa aa aa aa\naaa\naab aba\naacade\naaccb\naad daa\naadabb\naadd\naadda\naae\naaed\nab ab ba ab ab ba ba ba ab ab ba\nabaab\nabba baab\nabbc acbb\nabbdd\nabcadc\nabcd dbac\nabcdda\nabd dba bda abd dba adb abd\nabdbc bdcab abdbc abbdc\nabdced\nabe eba abe aeb\nabea baae baae\nabeb ebab beba\nac ca ca ac ac\nacabbe\nacb cba abc acb\nacbbb bbbac cbabb\naccbca\nacdceb abdcce cedbac abdecc\naceace\nad ad ad da da da da da ad\nadabb dabab\nadaec daaec\naddcde dcdeda\naddeb dedab bddae\nae ae ae ae\naeace\naeae\naedbc aecdb adceb dcbea\naedbec\naeddad\naeee\nb b b b b b b b b b\nbab\nbabbb\nbabd\nbacdae aabedc acedba cedaba\nbaebae\nbb bb\nbbadbd\nbbbbc\nbbdabe bbbaed\nbbdddc\nbbead bbdea babed\nbbedcc cdbbce\nbc bc cb bc bc bc bc cb bc bc bc bc cb\nbcada acdab\nbcadd\nbcb bcb bbc\nbce bec cbe\nbceeae\nbdbada\nbddee bdede bedde\nbde dbe deb\nbdeada\nbdebd\nbeadbe\nbecb\nbecbba becbab\nbee\nc c c c c c c c c c c c c c c c c c c c\ncaca ccaa\ncbac\ncbbbdd\ncbced cebcd ccbde\ncc cc cc cc cc\ncca cca acc\nccabc cccba\nccb ccb\nccbbaa\nccbd\ncccca\nccce\nccdbcb\ncce cce ecc\ncceab ecacb bccea\ncceaee\ncd dc dc cd cd cd cd cd dc dc cd dc\ncdaa cdaa dcaa adca\ncdabeb aebbcd\ncdb bcd dbc\ncdbbaa bacadb\ncdbece\ncdc ccd dcc cdc\ncdcda\ncdd\ncddebd\ncdee\ncecb\nceccc\ncedaed\ncee cee eec\nceeb bece bcee\nceebc becce\nd d d d d d d d d d\ndaacee\ndaaebb\ndabaa\ndacd cdda cdad\ndace\ndaeb\ndaeee adeee\ndb db db db bd db\ndbaaac dacaba dbacaa\ndbabcb\ndbb bdb dbb dbb dbb\ndbbead\ndbbeee\ndbced\ndbd ddb\ndbdd\ndbddb\ndbddbd\ndbde\ndbdece\ndbebbc\ndbee bede eebd\ndbeeb\ndca acd adc acd\ndcbdad\ndcbee\ndccab\ndcdccb\ndcec dcec\ndcecd dcdec eddcc\ndd dd dd dd dd\ndda dda add add\nddba dbda bdda\nddbb\nddccea\ndddcd\ndddd\ndde ded dde ded\ndded\nddedad\ndea aed\ndebb bbde edbb\ndebded\ndecdd\ndedc edcd\ndeddb\ndedee\ndee\ne e e e e e e e e e e e e e e e e\neaeab\neaeb\neaecbb baecbe\neb be be eb be\nebabbe\nebb beb\nebbae ebaeb\nebbedd\nebca eacb cbae bcae\nebcccd\nebdead ebdaed bededa\nebeb ebbe beeb\nebeeed dbeeee\nec ec ec ce ce\neca aec cae eca ace aec eca\necaaac acaeac\neccdbd bddcec ebdccd\necd dec dce ecd ecd edc cde cde\necdcc\nececba\nececd dcece\neceeea\ned ed ed ed ed\nedaad\nedaede deaede\nedcb dbec\nedda dade\neddbad dddaeb\neddeaa\nededa eaded\nee ee ee ee ee\neea\neecc\neecdd\neeced cedee\needecb\neeeaac\neeeac\neeed\neeeddc\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};
`,
      python: `def groupAnagrams(strs):
    # 返回分组后的二维列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个字符串（空格分隔；n = 1 且字符串为空串时该行为空行）
// 输出约定：每组一行，组内按输入顺序空格分隔，所有行按字典序升序排序后输出
const lines = input.split('\\n');
const n = Number(lines[0]);
const strs = n > 0 ? lines[1].split(' ') : [];

// 在这里写你的代码，按上面的约定输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个字符串（空格分隔；n = 1 且字符串为空串时该行为空行）
# 输出约定：每组一行，组内按输入顺序空格分隔，所有行按字典序升序排序后输出
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
strs = lines[1].split(' ') if n > 0 else []

# 在这里写你的代码，按上面的约定输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var groupAnagrams = function(strs) {
  const groups = new Map(); // 排序后的签名 -> 同组字符串
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return Array.from(groups.values());
};
`,
      python: `def groupAnagrams(strs):
    groups = {}  # 排序后的签名 -> 同组字符串
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const strs = n > 0 ? lines[1].split(' ') : [];

const groups = new Map(); // 排序后的签名 -> 同组字符串
for (const s of strs) {
  const key = s.split('').sort().join('');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(s);
}

// 组内保持输入顺序，所有行按字典序升序排序后逐行输出
const out = Array.from(groups.values()).map((g) => g.join(' '));
out.sort();
for (const line of out) {
  console.log(line);
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
strs = lines[1].split(' ') if n > 0 else []

groups = {}  # 排序后的签名 -> 同组字符串
for s in strs:
    key = ''.join(sorted(s))
    if key not in groups:
        groups[key] = []
    groups[key].append(s)

# 组内保持输入顺序，所有行按字典序升序排序后逐行输出
for line in sorted(' '.join(g) for g in groups.values()):
    print(line)
`,
    },
  },

  idea: `
两个字符串互为字母异位词，当且仅当它们按字符排序后完全相同。因此把每个字符串的排序结果当作「签名」，用哈希表把签名相同的字符串收集到同一组即可。

- **排序签名法**：对每个字符串排序作为 key，时间复杂度 O(n·k·log k)（n 为字符串个数、k 为最长字符串长度），代码最简洁
- **计数签名法**：用 26 个字母的出现次数拼成 key（如 "1#0#2#..."），时间复杂度 O(n·k)，适合字符串很长的场景

两种方法都正确：「互为字母异位词」是按字母多重集合定义的等价关系，同组当且仅当签名相同。空间复杂度 O(n·k)，用于存放哈希表。

参考代码采用排序签名法；遍历顺序即输入顺序，所以同组内的字符串天然保持输入中的先后次序。
`,

  explanation: `
- 遍历 \`strs\`，对每个字符串 \`s\` 计算签名：JS 拆成字符数组、\`sort()\` 排序、再 \`join('')\` 拼回；Python 用 \`sorted(s)\` 得到字符列表再 \`''.join(...)\`
- 哈希表维护「签名 → 同组字符串列表」：首次见到某签名就建空列表，然后把 \`s\` 追加进去；空串的签名仍是空串，会自然地聚成一组
- 最后返回哈希表所有值组成的二维数组；核心模式用 nestedMultiset 比对，组间与组内顺序都不影响判题，重复字符串的数量仍必须一致
- JS 的 \`Map\` 也可以用普通对象代替，但 \`Map\` 没有原型键（如 \`"constructor"\`）干扰，更稳妥

ACM 版本多了输出约定：把每组拼成一行（组内空格分隔），再对所有行整体做字典序排序后逐行打印。Python 的 \`sorted\` 与 JS 的 \`Array.prototype.sort\` 对纯小写 ASCII 字符串排序结果一致，均为按字符编码升序。
`,
};
